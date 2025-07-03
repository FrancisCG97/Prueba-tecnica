from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Literal
from datetime import date
from pathlib import Path
import json


app = FastAPI()
DB_FILE = Path("database.json")

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


class TareaBase(BaseModel):
    title: str = Field(..., min_length=1)
    due_date: date
    priority: Literal["baja", "media", "alta"]
    status: Literal["pendiente", "completada"] = "pendiente"

class Tarea(TareaBase):
    id: int


def cargar_tareas():
    try:
        with DB_FILE.open("r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def guardar_tareas(tareas):
    with DB_FILE.open("w") as f:
        json.dump(tareas, f, indent=4)

def nuevo_id(tareas):
    ids = [t["id"] for t in tareas]
    return max(ids) + 1 if ids else 1


@app.get("/tasks", response_model=list[Tarea])
def lista_tareas():
    return cargar_tareas()


@app.post("/tasks", response_model=Tarea)
def crear_tarea(tarea: TareaBase):
    if tarea.due_date <= date.today():
        raise HTTPException(status_code=400, detail="La fecha debe ser futura.")
    tareas = cargar_tareas()
    tarea_dict = tarea.dict()
    tarea_dict["due_date"] = tarea_dict["due_date"].isoformat()
    tarea_dict["id"] = nuevo_id(tareas)
    tareas.append(tarea_dict)
    guardar_tareas(tareas)
    return tarea_dict


@app.put("/tasks/{tarea_id}", response_model=Tarea)
def tarea_actualizada(tarea_id: int, actualizado: TareaBase):
    if actualizado.due_date <= date.today():
        raise HTTPException(status_code=400, detail="La fecha debe ser futura.")
    tareas = cargar_tareas()
    for tarea in tareas:
        if tarea["id"] == tarea_id:
            tarea.update(actualizado.dict())
            tarea["due_date"] = actualizado.due_date.isoformat()
            guardar_tareas(tareas)
            return tarea
    raise HTTPException(status_code=404, detail="No se encontró la tarea.")


@app.delete("/tasks/{tarea_id}")
def eliminar_tarea(tarea_id: int):
    tareas = cargar_tareas()
    tareas_actualizadas = [t for t in tareas if t["id"] != tarea_id]
    if len(tareas_actualizadas) == len(tareas):
        raise HTTPException(status_code=404, detail="No se encontró la tarea.")
    guardar_tareas(tareas_actualizadas)
    return {"ok": True}


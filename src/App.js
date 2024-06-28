import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import CircleNode from './components/CircleNode';
import CustomEdge from './components/CustomEdge';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ModalEdges from './components/ModalEdges';
import Header from './components/Header';
import ModalFlujoMaximo from './components/ModalFlujoMaximo';
import CustomSelectedEdge from './components/CustomSelectedEdge';

const nodeTypes = {
  circle: CircleNode,
};

const edgeTypes = {
  custom: CustomEdge,
  customSelected: CustomSelectedEdge,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [seccion, setSeccion] = useState()
  const [modalFlujoMaximo, setModalFlujoMaximo] = useState(false)
  const [fuente, setFuente] = useState()
  const [sumidero, setSumidero] = useState()

  useEffect(() => {
    setNodes([])
    setEdges([])
  }, [seccion])

  const [modaleEdges, setModaleEdges] = useState();

  function onConnect(params) {
    setModaleEdges(params);

    const edge = {
      id: `${params.source}-${params.target}`,
      source: params.source,
      target: params.target,
      type: 'custom',
      animated: true,
      data: { peso1: 0, peso2: 0 },
    };

    setEdges((e) => e.concat(edge));
  }

  function reloadPage() {
    setEdges([])
    setNodes([])
  }

  function getCantidadPesos() {
    if (!seccion?.nombre) return 0
    if (seccion.nombre === "Kruskal" || seccion.nombre === "Dijkstra") return 1
    if (seccion.nombre === "Flujo Máximo") return 2
  }

  async function postResolver() {
    let data = {
      aristas: edges.map(e => {
        let relacion = [
          parseInt(e.source),
          parseInt(e.target),
          parseInt(e.data.peso1),
          getCantidadPesos() === 2 ? parseInt(e.data.peso2) : 0
        ]
        return relacion
      }),
      nodos: nodes.length,
    }

    if (seccion.id === 2 || seccion.id === 3) {
      data = {
        ...data,
        fuente: parseInt(fuente),
        sumidero: parseInt(sumidero)
      }
    }

    fetch(`https://ioapi.cavesoft.com.ar/${seccion.url}/resolver/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())

      .then(data => {
        if (data.error) {
          alert(`Error: ${data.error}`)
          return
        }

        let updatedEdges = [...edges];

        data.aristas.forEach((a) => {
          const edgeIndex = updatedEdges.findIndex(e => e.id === `${a[0]}-${a[1]}`);

          if (edgeIndex !== -1) {
            let updatedEdge = { ...updatedEdges[edgeIndex] };
            updatedEdge.type = 'customSelected';
            updatedEdge.animated = false;

            if (seccion.id === 2) {
              updatedEdge.data.peso1 = a[2];
              updatedEdge.data.peso2 = a[3];
            }

            updatedEdges[edgeIndex] = updatedEdge;
          }
        });

        setEdges(updatedEdges);

        if (seccion.id === 1) {
          alert(`El peso es ${data.peso}`)
        }

        if (seccion.id === 3) {
          alert(`La distancia es de ${data.distancia}`)
        }

        if (seccion.id === 2) {
          alert(`El flujo máximo es de ${data.flujoMax}\n Cantidad de iteraciones: ${data.iteraciones}`)
        }

      })
      .catch((error) => {
        alert(`Error: ${data.error}`)
      })
      .finally(() => {
        return true
      });
  }


  function addNode() {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      position: { x: Math.random() * (window.innerWidth / 2) + window.innerWidth / 4, y: Math.random() * (window.innerHeight / 2) + window.innerHeight / 4 },
      data: { label: id },
      type: 'circle',
    };

    setNodes((n) => n.concat(newNode));
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Header seccion={seccion} setSeccion={setSeccion} postResolver={postResolver} setModalFlujoMaximo={setModalFlujoMaximo} realoadPage={reloadPage} />
      <Box
        onClick={addNode}
        sx={{
          position: 'absolute',
          bottom: 15,
          height: 25,
          background: "white",
          paddingX: "10px",
          left: 60,
          zIndex: 10,
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          userSelect: 'none',
          WebkitUserSelect: 'none',
          boxShadow: "1px 1px 4px #f1f1f1",
          border: "1px solid #f1f1f1",
          "&:hover": {
            background: "#f1f1f1"
          }
        }}>
        Agregar Nodo
      </Box>

      <ModalEdges modaleEdges={modaleEdges} setModaleEdges={setModaleEdges} setEdges={setEdges} getCantidadPesos={getCantidadPesos} />
      <ModalFlujoMaximo modalFlujoMaximo={modalFlujoMaximo} setModalFlujoMaximo={setModalFlujoMaximo} setFuente={setFuente} fuente={fuente} setSumidero={setSumidero} sumidero={sumidero} seccion={seccion} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        attributionPosition='top'

      >
        <Controls />
        <MiniMap pannable zoomable />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
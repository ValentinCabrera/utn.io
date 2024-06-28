import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export default function ModalEdges(props) {
    const { modaleEdges, setModaleEdges, setEdges, getCantidadPesos } = props;

    const [peso1, setPeso1] = useState('');
    const [peso2, setPeso2] = useState('');

    function borrarPesos() {
        setPeso1('');
        setPeso2('');
    }

    function closeModalEdges() {
        setEdges((e) => e.filter(edge => edge.id !== `${modaleEdges.source}-${modaleEdges.target}`));
        borrarPesos();
        setModaleEdges(null);
    }

    function confirmarEdge() {
        setEdges((e) => e.filter(edge => edge.id !== `${modaleEdges.source}-${modaleEdges.target}`));
        setEdges((e) => e.concat({
            id: `${modaleEdges.source}-${modaleEdges.target}`,
            source: modaleEdges.source,
            target: modaleEdges.target,
            type: 'custom',
            animated: true,
            data: { peso1, peso2 }
        }));
        borrarPesos();
        setModaleEdges(null);
    }

    return (
        <Modal
            open={modaleEdges ? true : false}
            onClose={closeModalEdges}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Conexión entre el nodo {modaleEdges?.source} y el nodo {modaleEdges?.target}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 2,
                    gap: 10

                }}>
                    <TextField
                        id="outlined-basic"
                        label={getCantidadPesos() === 1 ? "Peso" : "Peso 1"}
                        variant="outlined"
                        value={peso1}
                        onChange={(e) => {
                            if (isNaN(e.target.value)) return;
                            setPeso1(e.target.value)
                        }}
                    />
                    {getCantidadPesos() === 2 &&
                        <TextField
                            id="outlined-basic"
                            label="Peso 2"
                            variant="outlined"
                            value={peso2}
                            onChange={(e) => {
                                if (isNaN(e.target.value)) return;
                                setPeso2(e.target.value)
                            }}
                        />
                    }
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 2,
                }}>
                    <Button onClick={closeModalEdges} variant="contained" color='error'>Cancelar</Button>
                    <Button onClick={confirmarEdge} variant="contained"
                        color='success'
                        disabled={getCantidadPesos() === 1 ? !peso1 : !peso1 || !peso2}
                    >Confirmar</Button>
                </Box>
            </Box>
        </Modal>
    )
}
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export default function ModalFlujoMaximo(props) {
    const { modalFlujoMaximo, setModalFlujoMaximo, setFuente, fuente, setSumidero, sumidero, seccion } = props;

    return (
        <Modal
            open={modalFlujoMaximo}
            onClose={() => setModalFlujoMaximo(false)}
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
                    Configuración de {seccion?.nombre}
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
                        label={seccion?.nombre === "Flujo Máximo" ? "Fuente" : "Origen"}
                        variant="outlined"
                        value={fuente}
                        onChange={(e) => {
                            if (isNaN(e.target.value)) return;
                            setFuente(e.target.value)
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label={seccion?.nombre === "Flujo Máximo" ? "Sumidero" : "Destino"}
                        variant="outlined"
                        value={sumidero}
                        onChange={(e) => {
                            if (isNaN(e.target.value)) return;
                            setSumidero(e.target.value)
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 2,
                }}>
                    <Button onClick={() => setModalFlujoMaximo(false)} variant="contained"
                        color='success'
                    >Confirmar</Button>
                </Box>
            </Box>
        </Modal >
    )
}
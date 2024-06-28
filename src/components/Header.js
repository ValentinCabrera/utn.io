import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import ReplayIcon from '@mui/icons-material/Replay';

export default function Header(props) {
    const { seccion, setSeccion, postResolver, setModalFlujoMaximo, realoadPage } = props

    const [loading, setLoading] = useState(false)

    const secciones = [
        {
            id: 1,
            nombre: "Kruskal",
            url: "kruskal"
        },
        {
            id: 2,
            nombre: "Flujo Máximo",
            url: "flujoMaximo"
        },
        {
            id: 3,
            nombre: "Dijkstra",
            url: "dijkstra"
        }
    ]

    useEffect(() => {
        setSeccion(secciones[0])
    }, [])

    function handlePostResolver() {
        setLoading(true)
        postResolver()
            .then(() => {
                setLoading(false)
            })
    }

    return (
        <Box sx={{
            width: "100vw",
            height: "70px",
            backgroundColor: "white",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            boxShadow: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

        }}>
            {secciones.map(s => {
                return (
                    <Box sx={{
                        cursor: "pointer",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        paddingX: "60px",
                        "&:hover": {
                            background: "#b1b1b1"
                        },

                        background: seccion?.id === s.id && "#e1e1e1"
                    }}
                        onClick={() => setSeccion(s)}
                    >
                        {s.nombre}
                    </Box>
                )
            })}
            <IconButton
                onClick={realoadPage}
                sx={{
                    position: "absolute",
                    left: 0,
                    marginLeft: "20px"
                }}
            >
                <ReplayIcon
                    fontSize="large"
                />
            </IconButton>

            <Box sx={{
                position: "absolute",
                right: 0,
                marginLeft: "20px",
                display: "flex",
            }}>
                {(seccion?.id === 2 || seccion?.id === 3) &&
                    <IconButton
                        onClick={() => setModalFlujoMaximo(true)}
                    >
                        <SettingsIcon
                            fontSize="large"
                        />
                    </IconButton>
                }

                <IconButton
                    onClick={handlePostResolver}
                    disabled={loading}
                >
                    <PlayArrowIcon
                        color={loading ? "disabled" : "success"}
                        fontSize="large"
                    />

                </IconButton>
            </Box>
        </Box>
    )
}
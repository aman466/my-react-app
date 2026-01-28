import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

function Note(props) {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {props.items.map(item => (
                    <li
                        key={item.id}
                        onClick={() => props.onToggle(props.id, item.id)}
                        style={{
                            cursor: 'pointer',
                            textDecoration: item.completed ? 'line-through' : 'none',
                            opacity: item.completed ? 0.6 : 1,
                            padding: '4px 0',
                            userSelect: 'none'
                        }}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => props.onDelete(props.id)}
            >DELETE</Button>
        </div>
    )
}

export default Note;
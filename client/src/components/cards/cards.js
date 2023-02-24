import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props){
    const [open, setOpen] = React.useState(false);



    return(
        <>
        <FormDialog
            open={open}
            setOpen={setOpen}
            title={props.name}
            quant={props.quant}
            cost={props.cost}
            total={props.total}
            listCard={props.listCard}
            setListCard={props.setListCard}
            id={props.id}
        />

        <div className="card-container" onClick={() => setOpen(true)}>
            <h1 className="card-title">{props.name}</h1>
            <p className="card-id">{props.id}</p>
            <h3 className="card-quant">Quantidade:{props.quant}</h3>
            <h3 className="card-cost">Valor: R${props.cost}</h3>
            <h3 className="card-total">Total: R${props.total}</h3>

        </div>
    </>
    );
}

import TableCard from "./tableCard.jsx";
const showTables = ({tables, onDelete, onEdit}) => {
    return (
        <div className="row g-3">
            {tables.map((table) => (
                <div
                    key={table.id}
                    className="col-md-4 col-lg-3 d-flex justify-content-center "
                >
                    <TableCard table={table} onDelete={onDelete} onEdit={onEdit}/>
                </div>
            ))}
        </div>
    );
}

export default showTables;
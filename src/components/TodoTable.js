import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const columns = [
   { headerName: 'Description', field: 'description', sortable: true},
   { headerName: 'Priority', field: 'priority', sortable: true, filter: true,
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},
   { headerName: 'Date', field: 'date', sortable: true}
 ];

 export default function TodoTable({ todos, deleteTodo, gridRef }) {
   return (
      <div
         className="ag-theme-material"
         style={{
            height: '700px',
            width: '50%',
            margin: 'auto',
         }}
      >
         <AgGridReact
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api}
            rowSelection="single"
            columnDefs={columns}
            rowData={todos}>
            onRowClicked={deleteTodo}
         </AgGridReact>
      </div>
   )
}

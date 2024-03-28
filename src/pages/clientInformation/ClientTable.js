import React, { useState } from "react";
import { Table, Button, Input } from "reactstrap";
import Loader from "../../Components/Common/Loader";


const ClientTable = ({ clients, handleUpdate, handleDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedClient, setEditedClient] = useState({});

  const handleEdit = (client) => {
    setEditingId(client.id);
    setEditedClient({ ...client });
  };

  const handleChange = (e, field) => {
    setEditedClient({ ...editedClient, [field]: e.target.value });
  };

  const handleSave = () => {
    handleUpdate(editingId, editedClient);
    setEditingId(null);
  };

  if(clients.length === 0) {
    return <p> </p>
  }

console.log(clients);
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients && clients?.map((client, index) => (
          <tr key={client.id}>
            <th scope="row">{index + 1}</th>
            {editingId === client.id ? (
              <>
                <td>
                  <Input
                    type="text"
                    value={editedClient.firstName}
                    onChange={(e) => handleChange(e, "firstName")}
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={editedClient.lastName}
                    onChange={(e) => handleChange(e, "lastName")}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={editedClient.age}
                    onChange={(e) => handleChange(e, "age")}
                  />
                </td>
                <td>
                  <Input
                    type="email"
                    value={editedClient.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={editedClient.currentAddress}
                    onChange={(e) => handleChange(e, "currentAddress")}
                  />
                </td>
              </>
            ) : (
              <>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.age}</td>
                <td>{client.email}</td>
                <td>{client.currentAddress}</td>
              </>
            )}
            <td>
              {editingId === client.id ? (
                <Button  style={{borderRadius:20}} color="success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <div style={{display:'flex', gap:10}}>
                  <Button style={{borderRadius:20}} color="success" onClick={() => handleEdit(client)}>
                    Edit
                  </Button>
                  <Button
                  style={{borderRadius:20}}
                    color="secondary"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientTable;

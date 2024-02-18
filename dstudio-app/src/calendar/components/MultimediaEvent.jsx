

export const MultimediaEvent = ({ event }) => {

    return (
        <div>
        <h2>Contenido</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.notes}</td>
                <td>{new Date(event.start).toLocaleString()}</td>
                <td>{new Date(event.end).toLocaleString()}</td>
                <td>{event.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

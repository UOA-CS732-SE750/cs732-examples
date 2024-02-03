export default function BusinessCard({ name, phNum, email }) {
  return (
    <table>
      <tbody>
        {name && (
          <tr>
            <th>Name:</th>
            <td>{name}</td>
          </tr>
        )}
        {phNum && (
          <tr>
            <th>Phone number:</th>
            <td>{phNum}</td>
          </tr>
        )}
        {email && (
          <tr>
            <th>Email:</th>
            <td>{email}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function getTest() {
  return {
    type: 'TEST',
    payload: fetch('http://localhost:82/test.php', {
      method: 'GET'
    }).then(response => response.json())
  }
}

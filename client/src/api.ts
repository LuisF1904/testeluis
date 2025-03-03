export async function fetchViaturas() {
    try {
      const response = await fetch('http://localhost:5000/api/viaturas'); // URL corrigida
        if (!response.ok) {
        throw new Error('Erro ao buscar as viaturas');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

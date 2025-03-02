export async function fetchViaturas() {
    try {
      const response = await fetch('/api/viaturas'); // Chamada ao backend
        if (!response.ok) {
        throw new Error('Erro ao buscar as viaturas');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function getCurrentDateWithoutTime() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Retorna "YYYY-MM-DD"
}
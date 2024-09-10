export function formateDate(isoString : string | undefined) {
    if(isoString) { 
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }
}

export function formatDateInputElement(dateString : string | undefined) {
    if(dateString) { 
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
  }

  
import APIRoutes from '../routes/APIRoutes';

// Insert My order
export const API_InsertSaleOrderSave = async (objlist) => {
    console.log('objlist', objlist);
    try {
      const response = await fetch(`${APIRoutes.INSERT_SALE_ORDER_SAVE}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          objData: ''
        },
        body: JSON.stringify(objlist)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }    
    } catch (error) {
      console.error('Failed to insert favorite product list:', error);
      throw error; // Re-throw so the calling function can handle it
    }
  };
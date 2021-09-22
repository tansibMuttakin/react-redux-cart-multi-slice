import { uiActions } from "./ui_slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = ()=>{
    return async (dispatch)=>{
        
        const fetchData = async()=>{
            const response = await fetch("https://food-ordering-app-react-62eb0-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");
            if (!response.ok) {
                throw new Error('Failed to fetch cart data!');
            }
            const data = await response.json();
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replace({
                items:cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Fetching cart data failed",
                })
            );
        }
    }
}

export const sendCartData = (cart)=>{
    return async(dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "pending",
              title: "Sending...",
              message: "sending cart data",
            })
        );

        const sendRequest = async()=>{
            const response = await fetch(
                "https://food-ordering-app-react-62eb0-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
                {
                  method: "PUT",
                  body: JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity}),
                }
            );
        
            if (!response.ok) {
                dispatch(
                    uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "sending cart data failed",
                    })
                );
            }
        }
        try {
            
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                  status: "success",
                  title: "Success!",
                  message: "sent cart data successfully!",
                })
              );

        } catch (error) {
            dispatch(
                uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "sending cart data failed",
                })
            );
        }
    }
}

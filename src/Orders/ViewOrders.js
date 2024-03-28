import React, { useEffect, useState } from 'react';
import { fs, auth } from '../components/Config/Config';
import './ViewOrders.css'; 
import view from '../pages/Cart/images/view.png'; 

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUid = () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
        }
      });
    };

    fetchUid();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!uid) return;

      try {
        const ordersRef = fs.collection('orders').doc(uid).collection('userOrders');
        const snapshot = await ordersRef.get();
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [uid]);

  return (
    <div className='Contain'>
      <div className="orders-container">
        <div className="orders-list">
          <h1>My Orders</h1><br/>
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <h3>Order ID: {order.id}</h3>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.title} - Quantity: {item.quantity} - Price: ${item.price}
                  </li>
                ))}
              </ul>
              <p>Total Amount: ${order.totalAmount}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <img src={view} alt='img' height={550}/>
    </div>
  );
};

export default ViewOrders;

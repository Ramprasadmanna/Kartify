import PaypalScreen from './paypal';
import RazorPayScreen from './razorpay';
import { useParams } from 'react-router-dom';

const OrderScreen = () => {
  const { paymentGateway } = useParams();

  return paymentGateway === 'Paypal' ? <PaypalScreen /> : <RazorPayScreen />;
};

export default OrderScreen;

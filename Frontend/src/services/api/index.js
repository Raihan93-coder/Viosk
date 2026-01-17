import * as kiosk from './kiosk';
import * as admin from './admin';

const api = {
  ...kiosk,
  ...admin
};

export default api;

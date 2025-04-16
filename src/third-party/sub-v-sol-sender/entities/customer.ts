import { GenderEnum } from 'src/config/enums/gender';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';

export interface Customer {
  customerNo: string;
  customerID: string;
  customerPW: string;
  name: string;
  phone: string;
  birthDate: string;
  sex: 'male' | 'female';
  email: string;
  zipNo: string;
  address: string;
  addressDetail: string;
}

export function toCustomer(c: CustomerEntity): Customer {
  if (!c) {
    throw new Error('customer is undefined');
  }
  return {
    customerNo: c.no.toString(),
    customerID: c.id,
    customerPW: c.password,
    name: c.name,
    phone: c.mobilephone,
    birthDate: c.birthdate,
    sex: c.sex === GenderEnum.MALE ? 'male' : 'female',
    email: c.email,
    zipNo: c.postalCode,
    address: c.address,
    addressDetail: c.addressDetail,
  };
}

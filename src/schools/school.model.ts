import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  town: { type: String, required: true },
  tehsil: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  shift: { type: String, required: true },
  hasProjector: { type: Boolean, required: true },
  hasLaptop: { type: Boolean, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
});

export interface School extends mongoose.Document {
  name: string;
  status: string;
  startTime: string;
  endTime: string;
  shift: string;
  hasProjector: boolean;
  hasLaptop: boolean;
  address: mongoose.Schema.Types.ObjectId;
  organization: mongoose.Schema.Types.ObjectId;
}

export interface Address extends mongoose.Document {
  town: string;
  tehsil: string;
  district: string;
  state: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Organization extends mongoose.Document {
  name: string;
}

//export const SchoolModel = mongoose.model<School>('School', SchoolSchema);
//export const AddressModel = mongoose.model<Address>('Address', AddressSchema);
//export const OrganizationModel = mongoose.model<Organization>('Organization', OrganizationSchema);

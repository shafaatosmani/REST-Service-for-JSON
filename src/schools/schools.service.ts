import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School, Address, Organization } from './school.model'; // Ensure the correct import path

@Injectable()
export class SchoolsService {
  constructor(
    @InjectModel('School') private readonly schoolModel: Model<School>,
    @InjectModel('Address') private readonly addressModel: Model<Address>,
    @InjectModel('Organization') private readonly organizationModel: Model<Organization>,
  ) {}

  async insertSchool(
    name: string,
    status: string,
    startTime: string,
    endTime: string,
    shift: string,
    address: {
      town: string;
      tehsil: string;
      district: string;
      state: string;
      address: string;
      latitude: number;
      longitude: number;
    },
    hasProjector: boolean,
    hasLaptop: boolean,
    organization: {
      name: string;
    }
  ) {
    const newAddress = new this.addressModel(address);
    const newOrganization = new this.organizationModel(organization);

    // Save the address and organization documents
    const addressResult = await newAddress.save();
    const organizationResult = await newOrganization.save();

    // Create and save the school document with references to the address and organization
    const newSchool = new this.schoolModel({
      name,
      status,
      startTime,
      endTime,
      shift,
      hasProjector,
      hasLaptop,
      address: addressResult._id,
      organization: organizationResult._id,
    });
    const schoolResult = await newSchool.save();

    return {
      schoolId: schoolResult.id as string,
      addressId: addressResult.id as string,
      organizationId: organizationResult.id as string
    };
  }

  async getSchools() {
    const schools = await this.schoolModel.find().populate('address organization').exec();
    return schools.map(school => ({
      id: school.id,
      name: school.name,
      status: school.status,
      startTime: school.startTime,
      endTime: school.endTime,
      shift: school.shift,
      address: school.address,
      hasProjector: school.hasProjector,
      hasLaptop: school.hasLaptop,
      organization: school.organization
    }));
  }

  async getSingleSchool(schoolId: string) {
    const school = await this.findSchool(schoolId);
    return {
      id: school.id,
      name: school.name,
      status: school.status,
      startTime: school.startTime,
      endTime: school.endTime,
      shift: school.shift,
      address: school.address,
      hasProjector: school.hasProjector,
      hasLaptop: school.hasLaptop,
      organization: school.organization
    };
  }

  async updateSchool(
    schoolId: string,
    name: string,
    status: string,
    startTime: string,
    endTime: string,
    shift: string,
    address: {
      town: string;
      tehsil: string;
      district: string;
      state: string;
      address: string;
      latitude: number;
      longitude: number;
    },
    hasProjector: boolean,
    hasLaptop: boolean,
    organization: {
      name: string;
    }
  ) {
    const updatedSchool = await this.findSchool(schoolId);
    if (name) {
      updatedSchool.name = name;
    }
    if (status) {
      updatedSchool.status = status;
    }
    if (startTime) {
      updatedSchool.startTime = startTime;
    }
    if (endTime) {
      updatedSchool.endTime = endTime;
    }
    if (shift) {
      updatedSchool.shift = shift;
    }
    if (address) {
      const newAddress = new this.addressModel(address);
      const addressResult = await newAddress.save();
      updatedSchool.address = addressResult.id;
    }
    if (hasProjector !== undefined) {
      updatedSchool.hasProjector = hasProjector;
    }
    if (hasLaptop !== undefined) {
      updatedSchool.hasLaptop = hasLaptop;
    }
    if (organization) {
      const newOrganization = new this.organizationModel(organization);
      const organizationResult = await newOrganization.save();
      updatedSchool.organization = organizationResult.id;
    }
    await updatedSchool.save();
  }

  async deleteSchool(schoolId: string) {
    const result = await this.schoolModel.deleteOne({ _id: schoolId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find school.');
    }
  }

  private async findSchool(id: string): Promise<School> {
    let school;
    try {
      school = await this.schoolModel.findById(id).populate('address organization').exec();
    } catch (error) {
      throw new NotFoundException('Could not find school.');
    }
    if (!school) {
      throw new NotFoundException('Could not find school.');
    }
    return school;
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  async addSchool(
    @Body() requestBody: {
      name: string;
      status: string;
      startTime: string;
      endTime: string;
      shift: string;
      address: {
        town: string;
        tehsil: string;
        district: string;
        state: string;
        address: string;
        latitude: number;
        longitude: number;
      };
      hasProjector: boolean;
      hasLaptop: boolean;
      organization: {
        name: string;
      };
    }
  ) {
    const {
      name,
      status,
      startTime,
      endTime,
      shift,
      address,
      hasProjector,
      hasLaptop,
      organization,
    } = requestBody;

    const result = await this.schoolsService.insertSchool(
      name,
      status,
      startTime,
      endTime,
      shift,
      address,
      hasProjector,
      hasLaptop,
      organization
    );

    return result;
  }

  @Get()
  async getAllSchools() {
    const schools = await this.schoolsService.getSchools();
    return schools;
  }

  @Get(':id')
  async getSchool(@Param('id') schoolId: string) {
    return await this.schoolsService.getSingleSchool(schoolId);
  }

  @Patch(':id')
  async updateSchool(
    @Param('id') schoolId: string,
    @Body() requestBody: {
      name: string;
      status: string;
      startTime: string;
      endTime: string;
      shift: string;
      address: {
        town: string;
        tehsil: string;
        district: string;
        state: string;
        address: string;
        latitude: number;
        longitude: number;
      };
      hasProjector: boolean;
      hasLaptop: boolean;
      organization: {
        name: string;
      };
    }
  ) {
    const {
      name,
      status,
      startTime,
      endTime,
      shift,
      address,
      hasProjector,
      hasLaptop,
      organization,
    } = requestBody;

    await this.schoolsService.updateSchool(
      schoolId,
      name,
      status,
      startTime,
      endTime,
      shift,
      address,
      hasProjector,
      hasLaptop,
      organization
    );
    return null;
  }

  @Delete(':id')
  async removeSchool(@Param('id') schoolId: string) {
    await this.schoolsService.deleteSchool(schoolId);
    return null;
  }
}

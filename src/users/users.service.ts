import { Injectable } from '@nestjs/common';
import * as MOCKED_DATA from '../data/MOCK_DATA.json';
import { IUser, UserRole, UserStatus } from './users.model';
import { isArray } from 'lodash';

@Injectable()
export class UsersService {
    readonly data: IUser[] = MOCKED_DATA as unknown as IUser[];

    async list(skip: number, take: number, role: UserRole[] | UserRole, status: UserStatus[] | UserStatus, search?: string) {
        let paginatedData: IUser[] = [];
        let filteredData = this.data;

        if (isArray(role)) {
          filteredData = filteredData.filter(item => role.includes(item.role));
        } else {
          filteredData = filteredData.filter(item => item.role === role);
        }

        if (isArray(status)) {
          filteredData = filteredData.filter(item => status.includes(item.status));
        } else {
          filteredData = filteredData.filter(item => item.status === status);
        }

        if (search) {
          const searchLower = search.toLowerCase();
          filteredData = filteredData.filter(item =>
            (item.first_name && item.first_name.toLowerCase().includes(searchLower)) ||
            (item.last_name && item.last_name.toLowerCase().includes(searchLower)) ||
            (item.email && item.email.toLowerCase().includes(searchLower)) 
          );
        }

        paginatedData = filteredData.slice(skip, skip + take);

        return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: paginatedData,
                total: filteredData.length
              });
            }, 100);
          });
    }

}

import axios, { AxiosResponse } from 'axios'

import { authRepository } from './auth.repository'
import { Role } from '../model/role'

class RoleService {

    private readonly api = axios.create({ baseURL: 'https://localhost:3000/role' })

    private getHeaders() {
        const logged = authRepository.getLoggedUser()
        const token = logged ? logged.token : ''
        return {
            'Authorization': `Bearer ${token}`
        }
    }

    private isOk(response: AxiosResponse) {
        return response.status >= 200 && response.status < 300
    }

    private getData(response: AxiosResponse) {
        if (this.isOk(response)) {
            return response.data
        } else {
            if (response.status === 401 || response.status === 403) return null

            if (response.status === 400) {
                throw new Error('Usuário já existe!')
            } else {
                throw new Error(response.statusText, { cause: response.status })
            }
        }
    }


      public async getList(): Promise<Role[] | null> {
          try {
              const response = await this.api.get('', {
                  headers: this.getHeaders()
              });
              const data = this.getData(response);
              return data ? data as Role[] : null;
          } catch (error) {
              console.error('Error fetching roles:', error);
              return null;
          }
      }

      public async getRoleById(id: number): Promise<Role | null> {
          try {
              const response = await this.api.get(`${id}`, {
                  headers: this.getHeaders()
              });
              const data = this.getData(response);
              return data ? data as Role : null;
          } catch (error) {
              console.error(`Error fetching role with id ${id}:`, error);
              return null;
          }
      }

      public async createRole(role: Role): Promise<boolean> {
          try {
              const response = await this.api.post('', role, {
                  headers: this.getHeaders()
              });
              return this.isOk(response);
          } catch (error) {
              console.error('Error creating role:', error);
              return false;
          }
      }

      public async updateRole(id: number, role: Role): Promise<boolean> {
          try {
              const response = await this.api.put(`${id}`, role, {
                  headers: this.getHeaders()
              });
              return this.isOk(response);
          } catch (error) {
              console.error(`Error updating role with id ${id}:`, error);
              return false;
          }
      }

      public async deleteRole(id: number): Promise<boolean> {
          try {
              const response = await this.api.delete(`${id}`, {
                  headers: this.getHeaders()
              });
              return this.isOk(response);
          } catch (error) {
              console.error(`Error deleting role with id ${id}:`, error);
              return false;
          }
      }
  }


export const roleService = new RoleService()
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Role } from "@/model/role";
import { roleService } from "@/services/role.service";

import styles from "./styles.module.scss";

const UserRolesList: React.FC = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [newRoleName, setNewRoleName] = useState<string>("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesData = await roleService.getList();
      setRoles(rolesData || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleCreateRole = async () => {
    try {
      const newRole: Role = { 
        name: newRoleName,
        description: ""
      };
      await roleService.createRole(newRole);
      setNewRoleName("");
      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleDeleteRole = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await roleService.deleteRole(id);
        setRoles(roles.filter(role => role.id !== id)); // Remove the deleted role from the state
      } catch (error) {
        console.error(`Error deleting role with id ${id}:`, error);
      }
    } else {
      console.error("Role ID is undefined.");
    }
  };


  const handleSave = () => {
    console.log("Selected roles:", selectedRoles);
  };

  function voltar() {
    router.replace('users');
  }

  return (
    <div className={styles.roles}>
      <header>
        <h2>User Roles</h2>
        <div className={styles.actions}>
          <input
            type="text"
            placeholder="New Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
          <button onClick={handleCreateRole}>Create Role</button>
        </div>
      </header>
      <main>
        <ul>
          {roles.map(role => (
            <li key={role.id}>
              <span>{role.name}</span>
              <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <button onClick={voltar}>Cancel</button>
        <button className={styles.confirmbutton} onClick={handleSave}>Save</button>
      </footer>
    </div>
  );
};

export default UserRolesList;

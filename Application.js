const axios = require("axios");

class Application {
  #app;
  constructor(baseUrl, appKey) {
    this.#app = axios.create({
      baseURL: `${baseUrl}/api/application`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${appKey}`,
      },
    });
  }
  listUsers = async () => {
    let dataUsers = [];
    let next = true;
    let currentPage = 1;
    try {
      while (next) {
        const { data } = await this.#app.get(`/users`);
        const { totalPages } = data.meta.pagination;
        dataUsers = dataUsers.concat(data.data);
        next = currentPage < totalPages;
      }
      return {
        error: null,
        data: dataUsers,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  userDetails = async (id) => {
    try {
      const { data } = await this.#app.get(`/users/${id}`);
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  externalUserDetails = async (externalId) => {
    try {
      const { data } = await this.#app.get(`/users/external/${externalId}`);
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  createUser = async ({
    external_id,
    first_name,
    last_name,
    username,
    email,
    password,
    root_admin,
  }) => {
    try {
      const { data } = await this.#app.post("/users", {
        external_id,
        first_name,
        last_name,
        username,
        email,
        password,
        root_admin,
      });
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  updateUser = async (
    id,
    {
      external_id,
      first_name,
      last_name,
      username,
      email,
      password,
      root_admin,
    }
  ) => {
    try {
      const { data } = await this.#app.patch(`/users/${id}`, {
        external_id,
        first_name,
        last_name,
        username,
        email,
        password,
        root_admin,
      });
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  deleteUser = async (id) => {
    try {
      const { data } = await this.#app.delete(`/users/${id}`);
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listAllocations = async (nodeId) => {
    let allocations = [];
    let next = true;
    let currentPage = 1;
    try {
      while (next) {
        const { data } = await this.#app.get(
          `/nodes/${nodeId}/allocations?page=${currentPage}`
        );
        const { total_pages } = data.meta.pagination;
        next = total_pages < currentPage;
        currentPage++;
        allocations = allocations.concat(data.data);
      }
      return {
        error: null,
        data: allocations,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  createAllocations = async (nodeId, { ip, alias, ports }) => {
    try {
      const { data } = await this.#app.post(`/nodes/${nodeId}/allocations`, {
        ip,
        alias,
        ports: [ports],
      });
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  deleteAllocation = async (nodeId, allocationId) => {
    try {
      const { data } = await this.#app.delete(
        `/nodes/${nodeId}/allocations/${allocationId}`
      );
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listNodes = async () => {
    let nodes = [];
    let next = true;
    let currentPage = 1;
    try {
      while (next) {
        const { data } = await this.#app.get(`/nodes?page=${currentPage}`);
        const { total_pages } = data.meta.pagination;
        nodes = nodes.concat(data.data);
        next = total_pages < currentPage;
        currentPage++;
      }
      return {
        error: null,
        data: nodes,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  nodeDetails = async (id) => {
    try {
      const { data } = await this.#app.get(`/nodes/${id}`);
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  nodeConfiguration = async (id) => {
    try {
      const { data } = await this.#app.get(`/nodes/${id}/configuration`);
      return {
        error: null,
        data: data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  createNode = async ({
    name,
    location_id,
    fqdn,
    scheme,
    memory,
    memory_overallocate,
    disk,
    disk_overallocate,
    upload_size,
    daemon_sftp,
    daemon_listen,
  }) => {
    try {
      const { data } = await this.#app.post(`/nodes`, {
        name,
        location_id,
        fqdn,
        scheme,
        memory,
        memory_overallocate,
        disk,
        disk_overallocate,
        upload_size,
        daemon_sftp,
        daemon_listen,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  updateNode = async (
    id,
    {
      name,
      location_id,
      fqdn,
      scheme,
      memory,
      memory_overallocate,
      disk,
      disk_overallocate,
      daemon_sftp = 2022,
      daemon_listen = 8080,
    }
  ) => {
    try {
      const { data } = await this.#app.patch(`/nodes/${id}`, {
        name,
        location_id,
        fqdn,
        scheme,
        memory,
        memory_overallocate,
        disk,
        disk_overallocate,
        daemon_sftp,
        daemon_listen,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  deleteNode = async (id) => {
    try {
      const { data } = await this.#app.delete(`/nodes/${id}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listLocations = async () => {
    let locations = [];
    let next = true;
    let currentPage = 1;
    try {
      while (next) {
        const { data } = await this.#app.get(`/locations?page=${currentPage}`);
        locations = locations.concat(data.data);
        const { total_pages } = data.meta.pagination;
        next = total_pages < currentPage;
        currentPage++;
      }
      return {
        error: null,
        data: locations,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  locationDetails = async (locationId) => {
    try {
      const { data } = await this.#app.get(`/locations/${locationId}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  createLocation = async ({ short, long }) => {
    try {
      const { data } = await this.#app.post(`/locations`, {
        short,
        long,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  updateLocation = async (locationId, { short, long }) => {
    try {
      const { data } = await this.#app.patch(`/locations/${locationId}`, {
        short,
        long,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  deleteLocation = async (locationId) => {
    try {
      const { data } = await this.#app.delete(`/locations/${locationId}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listServers = async () => {
    let servers = [];
    let next = true;
    let currentPage = 1;
    try {
      while (next) {
        const { data } = await this.#app.get(`/servers?page=${currentPage}`);
        const { total_pages } = data.meta.pagination;
        next = total_pages < currentPage;
        servers = servers.concat(data.data);
        currentPage++;
      }
      return {
        error: null,
        data: servers,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  serverDetails = async (serverId) => {
    try {
      const { data } = await this.#app.get(`/servers/${serverId}`);
      console.log(data);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  externalServerDetails = async (externalId) => {
    try {
      const { data } = await this.#app.get(`/servers/external/${externalId}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  updateDetails = async (
    serverId,
    { name, user, external_id, description }
  ) => {
    try {
      const { data } = await this.#app.patch(`/servers/${serverId}/details`, {
        name,
        user,
        external_id,
        description,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  updateBuild = async (
    serverId,
    { allocation, memory, swap, disk, io, cpu, threads, feature_limits = {} }
  ) => {
    try {
      const { data } = await this.#app.patch(`/servers/${serverId}/build`, {
        allocation,
        memory,
        swap,
        disk,
        io,
        cpu,
        threads,
        feature_limits,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  updateStartup = async (
    serverId,
    { startup, environment = {}, egg, image, skip_scripts }
  ) => {
    try {
      const { data } = await this.#app.patch(`/servers/${serverId}/startup`, {
        startup,
        environment,
        egg,
        image,
        skip_scripts,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  createServer = async ({
    name,
    user,
    egg,
    docker_image,
    startup,
    environment = {},
    limits = {},
    feature_limits = {},
    allocation = {},
  }) => {
    try {
      const { data } = await this.#app.post(`/servers`, {
        name,
        user,
        egg,
        docker_image,
        startup,
        environment,
        limits,
        feature_limits,
        allocation,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  suspendServer = async (serverId) => {
    try {
      const { data } = await this.#app.post(`/servers/${serverId}/suspend`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  unsuspendServer = async (serverId) => {
    try {
      const { data } = await this.#app.post(`/servers/${serverId}/unsuspend`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  reinstallServer = async (serverId) => {
    try {
      const { data } = await this.#app.post(`/servers/${serverId}/reinstall`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  deleteServer = async (serverId) => {
    try {
      const { data } = await this.#app.delete(`/servers/${serverId}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  forceDeleteServer = async (serverId) => {
    try {
      const { data } = await this.#app.delete(`/servers/${serverId}/force`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listDatabases = async (serverId) => {
    try {
      const { data } = await this.#app.get(
        `/servers/${serverId}/databases?include=password,host`
      );
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  databaseDetails = async (serverId, databaseId) => {
    try {
      const { data } = await this.#app.get(
        `/servers/${serverId}/databases/${databaseId}`
      );
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  createDatabase = async (serverId, { database, remote, host }) => {
    try {
      const { data } = await this.#app.post(`/servers/${serverId}/databases`, {
        database,
        remote,
        host,
      });
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  resetPassword = async (serverId, databaseId) => {
    try {
      const { data } = await this.#app.post(
        `/servers/${serverId}/databases/${databaseId}/reset-password`,
        {}
      );
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.repsonse?.data.errors || err,
        data: null,
      };
    }
  };
  deleteDatabase = async (serverId, databaseId) => {
    try {
      const { data } = await this.#app.delete(
        `/servers/${serverId}/databases/${databaseId}`
      );
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listEggs = async (nestId) => {
    try {
      const { data } = await this.#app.get(
        `/nests/${nestId}/eggs?include=nests,servers,config,script,variables`
      );
      return {
        error: null,
        data: data.data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  eggDetails = async (nestId, eggId) => {
    try {
      const { data } = await this.#app.get(`/nests/${nestId}/eggs/${eggId}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  listNests = async () => {
    let nests = [];
    let next = true;
    let currentPage = 1;
    try {
      while (next) {
        const { data } = await this.#app.get(
          `/nests?page=${currentPage}?include=eggs,servers`
        );
        const { total_pages } = data.meta.pagination;
        next = total_pages < currentPage;
        currentPage++;
        nests = nests.concat(data.data);
      }
      return {
        error: null,
        data: nests,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
  nestDetails = async (nestId) => {
    try {
      const { data } = await this.#app.get(`/nests/${nestId}`);
      return {
        error: null,
        data,
      };
    } catch (err) {
      return {
        error: err.response?.data.errors || err,
        data: null,
      };
    }
  };
}

module.exports = Application;

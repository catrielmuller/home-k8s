import { Config } from '../../configs';

export const nfsSubDirExternalProvisionerValues = {
  nfs: {
    server: Config.nfs.server,
    path: Config.nfs.path,
    mountOptions: ['nfsvers=3,nolock'],
  },
};

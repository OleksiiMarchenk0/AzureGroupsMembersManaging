'use strict';

const build = require('@microsoft/sp-build-web');
const deploy = require('@pnp/spfx-node');
const path = require('path');
const packageSolution = require('@microsoft/sp-build-web/lib/tasks/package-solution/package-solution');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));


exports.deploy = series(build.tasks.packageSolution.packageSolutionTask, () => {
  const deployOptions = {
    siteUrl: process.env.TENANT_URL,
    creds: {
      clientId: process.env.CLIENT_ID,
      certificatePath: 'cert.pfx',  // This should match the file name used in the workflow
      certificatePassword: process.env.CERT_PASSWORD,
      tenantId: process.env.TENANT_ID
    }
  };

  return src('sharepoint/solution/*.sppkg')
    .pipe(deploySPFx(deployOptions));
});
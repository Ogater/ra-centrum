module.exports = {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "selector-max-id": 0,
    "selector-max-type": 0,
    "selector-no-qualifying-type": true,
    "selector-class-pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
    "scss/at-import-no-partial-leading-underscore": true,
    "scss/dollar-variable-pattern": "^([a-z][a-z0-9-]*)(-[a-z0-9-]+)*$"
  }
};

import {
  IPublicApiSkeleton,
  IPublicApiHotkey,
  IPublicApiSetters,
  IPublicApiMaterial,
  IPublicApiEvent,
  IPublicApiProject,
  IPublicApiCommon,
  IPublicApiLogger,
  IPublicApiCanvas,
  IPublicApiPlugins,
  IPublicModelEngineConfig,
 } from '@alilc/lowcode-types';

declare global {
  interface Window {
    AliLowCodeEngine: {
      skeleton: IPublicApiSkeleton;
      hotkey: IPublicApiHotkey;
      setters: IPublicApiSetters;
      config: IPublicModelEngineConfig;
      material: IPublicApiMaterial;

      /**
       * this event works globally, can be used between plugins and engine.
       */
      event: IPublicApiEvent;
      project: IPublicApiProject;
      common: IPublicApiCommon;
      plugins: IPublicApiPlugins;
      logger: IPublicApiLogger;

      /**
       * this event works within current plugin, on an emit locally.
       */
      pluginEvent: IPublicApiEvent;
      canvas: IPublicApiCanvas;
    };
  }
}

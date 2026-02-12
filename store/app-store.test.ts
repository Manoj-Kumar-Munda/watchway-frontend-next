import { beforeEach, describe, expect, it } from 'vitest';
import appStore from './app-store';

describe('appStore', () => {
  beforeEach(() => {
    appStore.setState({ sidebarOpen: true });
  });

  it('toggles sidebar state', () => {
    appStore.getState().toggleSidebar();
    expect(appStore.getState().sidebarOpen).toBe(false);

    appStore.getState().toggleSidebar();
    expect(appStore.getState().sidebarOpen).toBe(true);
  });

  it('sets sidebar state directly', () => {
    appStore.getState().setSidebarOpen(false);
    expect(appStore.getState().sidebarOpen).toBe(false);
  });
});

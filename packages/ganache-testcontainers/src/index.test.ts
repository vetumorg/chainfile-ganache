import { afterAll, beforeAll, expect, it } from '@workspace/jest/globals';

import { GanacheClient, GanacheContainer, StartedGanacheContainer } from './index';

let container: StartedGanacheContainer;

beforeAll(async () => {
  container = await new GanacheContainer().start();
});

afterAll(async () => {
  await container.stop();
});

it('should expose host rpc url', async () => {
  expect(container.getHostRpcEndpoint()).toMatch(/http:\/\/localhost:\d+/);
});

it('should rpc(eth_blockNumber) via viem', async () => {
  const client: GanacheClient = container.client;
  const blockNumber = await client.getBlockNumber();
  expect(blockNumber).toBeGreaterThanOrEqual(0n);
});

This project is part of the [Chainfile](https://chainfile.org) ecosystem;
it provides a Docker image for running Ganache in a container for toolchain isolation.

```shell
npm i -D ganache-testcontainers viem
```

```typescript
import { afterAll, beforeAll, expect, it } from '@jest/globals';

import { GanacheClient, GanacheContainer, StartedGanacheContainer } from './index';

let container: StartedGanacheContainer;

beforeAll(async () => {
  container = await new GanacheContainer().start();
});

afterAll(async () => {
  await container.stop();
});

it('should rpc(eth_blockNumber) via viem', async () => {
  const client: GanacheClient = container.client;
  const blockNumber = await client.getBlockNumber();
  expect(blockNumber).toBeGreaterThanOrEqual(0n);
});
```

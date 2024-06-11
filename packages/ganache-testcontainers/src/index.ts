import { AbstractStartedContainer, GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import {
  type Client,
  createClient,
  http,
  type HttpTransport,
  type PublicActions,
  publicActions,
  type TestActions,
  testActions,
  type WalletActions,
  walletActions,
} from 'viem';
import { localhost } from 'viem/chains';

export class GanacheContainer extends GenericContainer {
  constructor(image: string = 'docker.io/trufflesuite/ganache:v7.9.2') {
    super(image);

    this.withWaitStrategy(Wait.forLogMessage('RPC Listening on '));
    this.withExposedPorts(8545);
  }

  async start(): Promise<StartedGanacheContainer> {
    return new StartedGanacheContainer(await super.start());
  }
}

type GanacheChain = typeof localhost;

export type GanacheClient = Client<HttpTransport, GanacheChain> &
  TestActions &
  PublicActions<HttpTransport, GanacheChain> &
  WalletActions<GanacheChain>;

export class StartedGanacheContainer extends AbstractStartedContainer {
  public readonly client: GanacheClient;

  constructor(startedTestContainer: StartedTestContainer) {
    super(startedTestContainer);
    this.client = this.createClient();
  }

  getHostRpcEndpoint(host: string = this.getHost()): string {
    return `http://${host}:${this.getMappedPort(8545)}`;
  }

  createClient(host: string = this.getHost()): GanacheClient {
    return createClient({
      cacheTime: 0,
      chain: localhost,
      transport: http(this.getHostRpcEndpoint(host)),
      name: 'Ganache Client',
      key: 'ganache',
      type: 'ganache',
    })
      .extend(testActions({ mode: 'ganache' }))
      .extend(publicActions)
      .extend(walletActions);
  }
}

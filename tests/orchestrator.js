import retry from "async-retry";

async function waitForAllServicesToBeReady() {
  await waitForWebServerReady();

  async function waitForWebServerReady() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw new Error(`Web server is not ready. Status: ${response.status}`);
      }
    }
  }
}

const orchestrator = {
  waitForAllServicesToBeReady,
};

export default orchestrator;

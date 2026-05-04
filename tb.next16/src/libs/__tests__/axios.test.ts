describe("Axios Instances", () => {
  beforeEach(() => {
    jest.resetModules();

    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com";
  });

  it("should create publicAxiosInstance with correct baseURL and timeout", async () => {
    const { axiosInstance } = await import("../axios");

    expect(axiosInstance.defaults.baseURL).toBe("https://api.example.com/");
    expect(axiosInstance.defaults.timeout).toBe(20000);
  });
});

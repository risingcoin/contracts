import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;
  const { deployer, treasury } = await getNamedAccounts();
  const { parseEther } = hre.ethers.utils;
  const SECONDS_PER_DAY = 24 * 60 * 60;
  const now = Math.round(Date.now() / 1000);
  const today = now - (now % SECONDS_PER_DAY);
  const rc = await get("RC");
  await deploy("Adjuster", {
    from: deployer,
    args: [rc.address, treasury, parseEther("1.0"), parseEther("1.01"), today],
    log: true,
    deterministicDeployment: true,
  });
};
export default func;
func.tags = ["Adjuster"];

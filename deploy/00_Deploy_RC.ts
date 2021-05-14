import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer, treasury } = await getNamedAccounts();

  await deploy("RC", {
    from: deployer,
    args: [treasury],
    log: true,
    deterministicDeployment: true,
  });
};
export default func;
func.tags = ["RC"];

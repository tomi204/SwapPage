// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
pragma abicoder v2;
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Swap is Ownable, ReentrancyGuard {
    ISwapRouter public immutable swapRouter;
    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapExactInput(
        uint256 amountIn,
        address _tokenIn,
        address _tokenOut
    ) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(
            _tokenIn,
            msg.sender,
            address(this),
            amountIn
        );
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), amountIn);
        ISwapRouter.ExactInputParams memory params = ISwapRouter
            .ExactInputParams({
                path: abi.encodePacked(_tokenIn, poolFee, _tokenOut),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0
            });
        amountOut = swapRouter.exactInput(params);
    }

    function swapExactOutput(
        uint256 amountOut,
        address _tokenIn,
        address _tokenOut
    ) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(
            _tokenIn,
            msg.sender,
            address(this),
            amountIn
        );
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), amountIn);
        ISwapRouter.ExactOutputParams memory params = ISwapRouter
            .ExactOutputParams({
                path: abi.encodePacked(_tokenIn, poolFee, _tokenOut),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: type(uint256).max
            });
        amountIn = swapRouter.exactOutput(params);
    }

    function withdraw(address _token, uint256 _amount) external onlyOwner {
        TransferHelper.safeTransfer(_token, msg.sender, _amount);
    }
}

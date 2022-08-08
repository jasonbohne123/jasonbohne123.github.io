![](https://miro.medium.com/max/1020/0*3FIrLr0vV4HQkodl.jpg)

_TL;DR: By interpreting option valuation as a dynamical system, we can estimate the governing equations of fair value and test the effectiveness of the Black Scholes equation off publicly available option data._


Background
==========

If you are familiar with options, you probably have heard of the Black Scholes equation. Originally discovered in 1973 by Myron Scholes and Fisher Black, the Black Scholes equation is a partial differential equation that relates the price of a European option on an underlying to the underlying price, time to expiration, volatility, and the risk-free rate.

![](https://miro.medium.com/max/1038/0*2KjWDaDnmfjjiadH.png)
Black Scholes Partial Differential Equation

One interpretation of the above equation can be taken from the perspective of dynamical systems. Viewing option valuation as a dynamical system, the Black-Scholes equation is then the equation that governs the fair value. As differentiability in space and time is assumed, small perturbations in the observed data should have a small effect on the resulting fair value.

However, we know from practice this isn’t always the case. Market prices are typically not the theoretical Black-Scholes value. For one volatility is an unobserved parameter and must be estimated from the market. Empirically, it’s common to see options of the same underlying and expiration to imply a smile of volatility values across strike prices. More generally, one often will see a premium on puts relative to an equal moneyness call due to popular demand for downside protection.

Naturally, it is worth questioning whether option markets still follow the Black-Scholes equation, and if so to what extent?

Applying PySINDy
================

One way we can test the effectiveness of the Black-Scholes is to sample option market data and then fit a differential equation between our observed data (underlying price and time to expiration) and the quantity of interest (market price). While one could brute force this by approximating derivatives using finite difference methods and solving a least squares system, PySINDy is a python package designed to do exactly such.


Given a set of observed data, PySINDy estimates the most likely governing equation of the feature set across time. For each feature, the governing equation can be expressed on a basis of polynomials or trigonometric functions. In either case, the optimal governing equation for a feature might be zero, indicating that the specific feature’s best estimate across time is constant.

For our problem, we choose the basis for underlying price to be polynomials up to degree 2. Assuming the governing equation does not have a drift process, this gives us up to 8 distinct differential operators for underlying price to include within our regression equation.

Initialize PDE constraints for differential operators![](https://miro.medium.com/max/1400/0*2PzdV6SWNUlQNUKa.png)

Differential operators on underlying price included in our model

In order to solve the linear system of basis functions above, PySINDy must first numerically estimate the derivatives of the feature set. You do have the flexibility to adjust the method of differentiation (continuous vs discrete) however the default finite difference method is sufficient for most applications. If your data tends to be quite noisy, it might help to smooth the data via a Savitzky-Golay filter before numerically differentiating as shown below. More can be found [here.](https://pysindy.readthedocs.io/en/stable/examples/1_feature_overview.html#differentiation-options)

Savitzky-Golay Filter to smooth before numerical differentiation

Now that all of the derivatives for the chosen differential operators have been estimated we will solve the linear system to fit the model. PySINDy offers quite the support of optimizers from [Scikit-Learn](https://scikit-learn.org/stable/index.html) and [CVXPY](https://www.cvxpy.org/) including

*   Least Absolute Shrinkage and Selection Operator (LASSO)
*   Least Angle Regression (LARS)
*   Sequential Least Squares Programming (SQSLP)
*   Sparse Relaxed Regularized Regression (SR3) and its variants
*   Forward Regression Orthogonal Least-Squares (FROLS)

Both LASSO and LARS solve the system while simultaneously performing variable selection so let’s use these. In both cases, we do not fit an intercept as it assumed there is not a drift process. The strength of the l1 regularization, and therefore the sensitivity of the variable selection, in LASSO is determined by the hyperparameter alpha.

In Least Angle Regression, the sensitivity of variable selection can be adjusted by the `n_nonzero_coefs` hyperparameter.

Finally, we can create the full model within PySINDy and fit it to observed option data using both LASSO and LARS.

Fitting to Observed Market Data
===============================

To test the effectiveness of the Black-Scholes in practice, I sampled historical daily options data for a call on the S&P500. Looking for a contract that had enough data, I chose to use the SPY $400 call expiring on September 30th of 2022.

For fetching the actual data, [robinstocks](https://pypi.org/project/robin-stocks/) is a quick, easy-to-use python package that allows you to access market data via your Robinhood account.

![](https://miro.medium.com/max/1400/0*p4E-AaQJXlMH79B4.png)

Now that we have formatted the data, we can solve for the best-fitted model using both the LASSO and LARS optimization method.

**LASSO:**

Using LASSO, the best-fitted governing equation contains two additional terms to the original Black Scholes Equation.

```
(x0)' = 5.946 x0 + -0.215 x0x0\_1 + -0.120 x0x0x0\_1 + -0.215 x0x0\_11 + -0.120 x0x0x0\_11
```

However, note that the best-fitted coefficient estimates for these terms are near identical to the first and second-order differential that appears in the original Black Scholes. This leads me to believe these terms are correlated and their appearance might be a result of the sparsity of data or the value of the regularization parameter chosen.

**LARS:**

The best-fitted governing equation here is a bit different than the Black-Scholes equation. Specifically, it is a first-order differential equation instead of a second-order.

```
(x0)' = 5.946 x0 + -0.431 x0x0\_1 + -0.239 x0x0x0\_1
```

Moving Forward
==============

Interpreting option valuation as a dynamical system allows us to estimate the most likely governing equation of fair value using PySINDY. Determining the relevance of the Black Scholes Equation in an options market can let one quantify how fairly priced that market is across time. This approach can be applied to a single asset or as a metric of comparison across multiple assets.

If you are interested in learning more about PySINDy and its dependencies, check out the following

_Original PySINDy Paper:_

[https://www.pnas.org/doi/pdf/10.1073/pnas.1517384113](https://www.pnas.org/doi/pdf/10.1073/pnas.1517384113)


![](https://miro.medium.com/max/1020/1*xsW82f_F5lUdf34Wm1a4FA.jpeg)

Options are contracts that give the holder the right to exercise a claim at a specific price and time. What differentiates options from standard future contracts is that the holder is not under an obligation to exercise. Most options contracts available to retail traders today are of the American style.

From a mathematical perspective, finding the fair price of an option is an interesting problem. Researchers have applied partial differential equations, probability, optimization, and even [quantum computing](https://quantum-computing.ibm.com/lab/docs/iql/finance-labs) to determine the present value of options contracts. Given the depth of active research and popularity of trading options, it only makes sense to apply some of the theory in practice.

The **purpose of this article** is to show how to calculate the  theoretical price of options you have in your **Robinhood Portfolio** using a variety of pricing models.

That being said, there are  two main tasks at hand.

1.  Interacting with [**RobinStocks**](https://github.com/jmfernandes/robin_stocks)
2.  Using [**QuantLib**](https://www.quantlib.org/) to Price Option Contracts

Robinhood API
-------------

[RobinStocks](https://github.com/jmfernandes/robin_stocks) is a python library to interact with the Robinhood API. While I did not experience any issues, this library is not supported by Robinhood so use it at your own risk.

To start off, I imported the package and connected it to my Robinhood account. The sample code for this can be found in the [RobinStocks documentation](https://readthedocs.org/projects/robin-stocks/downloads/pdf/latest/). Once I authenticated with my Robinhood account, I was able to pull my current option positions with `rs.get_open_option_positions().` Filtering the JSON response to the properties of each contract I was able to store the _underlying_, _strike_, _expiration_, and _right_ in a list that we will use later on.

**Sample Output:**

```
('AAPL', '2022-04-14', '150.0000', 'call')
```

**QuantLib**
------------

[QuantLib](https://www.quantlib.org/) is an open-source library for pricing various financial derivatives. We will be utilizing their option pricing engines designed for Vanilla options- additional engines are available too.

For this example, we will price American options with two approximation methods; the [**Barone-Adesi-Whaley Method**](https://www.deriscope.com/docs/Barone_Adesi_Whaley_1987.pdf) and the [**Bjerksund-Stensland Method**](https://www.sciencedirect.com/science/article/abs/pii/095652219390009H)**.** The solution to the [**Black-Scholes PDE**](https://www.journals.uchicago.edu/doi/10.1086/260062) cannot be applied from a theoretical perspective, however, it will also be included as a comparison.


**Implementation**
------------------

Now that we have discussed our game plan for pricing American options, it’s time for implementation. As always, the full code can be found on my [GitHub.](https://github.com/jasonbohne123/Option_Pricing_Robinhood)

To run the program is quite simple. Enter `python main.py` in your terminal and follow the prompts that appear on-screen. After authenticating your Robinhood account, you will be able to see all the current options in your portfolio. From here, you can price any options using different pricing engines that approximate the true value. See an example below.

![](https://miro.medium.com/max/1400/1*e6E5nd-E0CqProywHwxFPA.png)Example output on a selection of AAPL call options of various strikes

Most of the code in `main.py` consists of formatting our data frame and setting up the necessary inputs to calculate the theoretical value in `pricer.py`. Behind the scenes of our pricing script is much more interesting, however.

Pricer.py
---------

We begin by passing in the required properties to compute the current price of the contract such as the underlying, underlying price, strike, expiration, and right. Our optional parameter `settlement` is used for the analytical approximation methods and defaults to today’s current date.

Both the risk-free rate and dividend rate of the underlying affect the expected return at expiration so we need to account for this in our pricer. In particular, we can fetch the dividend rate for the underlying using the following function in RobinStocks, `rs.get_fundamentals(symbol)[0][‘dividend_yield’])`

The last line in the above code snippet computes the last month’s historical volatility of the underlying by computing the standard deviation of log returns from close to close.

Again we use RobinStocks to fetch the necessary close prices for the given underlying.

Since we now have all of our parameters, we can define our option using Quantlib. The [**Black-Scholes**](https://www.journals.uchicago.edu/doi/10.1086/260062)  engine requires a European option while the [**Barone-Adesi-Whaley**](https://www.deriscope.com/docs/Barone_Adesi_Whaley_1987.pdf) and the [**Bjerksund-Stensland**](https://www.sciencedirect.com/science/article/abs/pii/095652219390009H) engines require an American option, hence why we have defined both.

We also need to specify the random process which we are assuming the log price of the underlying to follow. Here we have used the standard Black-Scholes-Merton process however other processes can be applied. Some of which could be the [Heston process](https://www.jstor.org/stable/2962057) (stochastic volatility) or the [Variance Gamma process](https://engineering.nyu.edu/sites/default/files/2018-09/CarrEuropeanFinReview1998.pdf)(time change determined by Gamma process).

Finally, we need to specify the model to use. For all three of the models, we set the pricing engine to be the respective input of the user. From there, we can compute the net present value of the option, which is returned to the `main.py` function

For a more thorough description of the pricing engines, check out [**Analytical Approximations for American Options**](https://medium.com/@jbohne822/analytical-approximations-for-american-options-bdf3ef984a4a)  where I describe the setup and formulation of each of the models used here.

All in all, here is the final output for a collection of call options on `AAPL`

![](https://miro.medium.com/max/1400/1*vQ-Yxdd3LwOl3WcLPaQ26w.png)Note the theoretical vs market prices using Black-Scholes



If you liked this article and want to receive updates on future articles make sure to follow me on [**Twitter**](https://twitter.com/jason_bohne)**!**

**_Disclaimer:_**

_Portions of the code are reused from both_ [_RobinStocks_](https://github.com/jmfernandes/robin_stocks) _and_ [_QuantLib_](https://www.quantlib.org/)_. This post is not affiliated with any of the mentioned projects or organizations. None of this is financial advice. Use any code at your own risk_

<img src="https://miro.medium.com/max/1020/1*pJTKo5wO4iuJJ2fWQGAMXA.jpeg" alt="drawing" width="1020"/>

Options are publicly traded financial instruments with a specific underlying asset attached to them, commonly equities. The holder of the option has the right to buy or sell the underlying asset at the strike price of the option. In addition to strikes, each option has an expiration which is the final date a holder can exercise the contract on. The expiration terms can also differ between contracts; American options allow the holder to exercise their right anytime before the expiration date while European options only allow the holder to exercise on the expiration date.

Since the 1973 paper, “[**The Pricing of Options and Corporate Liabilities**](https://www.journals.uchicago.edu/doi/10.1086/260062)” by Fischer Black and Myron Scholes, analytical closed-form solutions for European style contracts have been known. However, the solution to the **Black-Scholes PDE** cannot be extended to American options due to the subtle yet significant difference in their structures.

![](https://miro.medium.com/max/1400/1*pug7TSAEtkMWRpzbWimWlA.png)
Black-Scholes Partial Differential Equation

The key difference is that American options can be **exercised anytime between issuance and expiration**. This makes the expected value of the American contract at expiration dependent on the path between now and then, as the holder can exercise prematurely.

This makes an already difficult problem even harder! **Analytical solutions** like the solution to the Black-Scholes PDE cannot be applied  to path-dependent options. However, the lack of a closed-form solution is not due to the formulation of the PDE which holds for both styles of options. Instead, this is due to the boundary conditions which arise from the freedom of an American option

As the no-arbitrage argument is not satisfied, approximations of the solution to the BS PDE **have been derived** which account for the potential early exercise. Notable approximations include the [**Barone-Adesi-Whaley Method (**](https://www.deriscope.com/docs/Barone_Adesi_Whaley_1987.pdf)’87) and the [**Bjerksund-Stensland Method (‘93)**](https://www.sciencedirect.com/science/article/abs/pii/095652219390009H).

The Barone-Adesi-Whaley Method is formulated from the fact the B.S. PDE applies to **both European and American Options**. Given the PDE holds for the total value of the option, the argument is that it must also hold for the early exercise premium. From here a **Quadratic Approximation** of the American contract, C(S, T), is derived from the corresponding European contract, c(S, T), and our approximation term.

![](https://miro.medium.com/max/1400/1*SSGrIKDbSaOmVaamdTvhtQ.png)
![](https://miro.medium.com/max/1370/1*iGjtsBPLf9VPnq6ku8sefQ.png)

With the spot price S, the critical spot price S ∗ the time to expiration T, and exercisable proceeds S − X.

Another popular approximation is the  [**Bjerksund-Stensland Method**](https://www.sciencedirect.com/science/article/abs/pii/095652219390009H) which proposes a class of **general exercise strategies** for American options specified by a trigger price.

![](https://miro.medium.com/max/1400/1*8ccBCW6h6Gze-2rfaGJqiQ.png)
Approximation of American Call given a General Exercise Strategy

Where S is the spot price, T is the time to expiration, K is the strike price, X is the trigger price, σ is underlying volatility, α(X) and β (x) are functions of interest rate, cost to carry, underlying volatility, and trigger price.

One way to calculate the trigger price is with a time-weighted average between **infinite lived and an infinitesimal lived** American option, shown below.

![](https://miro.medium.com/max/1134/1*7sk1ciscMbtYMWJEgWOCDw.png)
Time Weighted Average Trigger Price

These methods are just the tip of the iceberg. In addition to analytical approximations, numerical methods are often utilized. Both lattices, in the form of binomial trees, and simulations such as Monte Carlo, are used to compute the present value of the contract. From an optimization perspective solving for the present value of an American option is an optimal stopping problem as at each timestep we need to determine whether holding or exercising is the optimal choice.

If you liked this article and want to receive updates on future articles make sure to follow me on [Twitter](https://twitter.com/jason_bohne)!

# Coprime_PI_Algorithm

## Description
This is an algorithm that calculates π based on probability.  
This idea comes from the Probability `P(gcd(a, b) = 1) = 6 / π^2`. This states that the probabilty of two random numbers being coprime, e.g. the greatest common denominator being 1, is 6 divided by π^2.  
If we define the probability as `x = P(gcd(a, b) = 1) => x = 6 / π^2`, we can rearrange this equation to solve for  
```π => π = sqrt(6 / x)```  
x will just be the probability which was evaluated by iterating a for loop n times, generating two random numbers, and checking whether these numbers are coprime and then adding to a coprime counter.

```js
  for(let i = 0; i < n; i++){
    if(isCoprime(random1, random2)){
      coprimes++;
    }
  }
```
After counting the coprimes we evaluate pi:
```js
return Math.sqrt(6 / (coprimes / totalnumbers ))
```

## More
The accuracy of π depends on the total amount of numbers that are generated. I tried running parallel iterations with web workers for more accurate iterations. The first two decimals of π are right at almost every try `(3.14...)`.
The most precise estimate that this algorithm brought was `3.14159...`. You can try this code yourself and see if you can increase the accuracy by modifying the total count of numbers and the chunksize.

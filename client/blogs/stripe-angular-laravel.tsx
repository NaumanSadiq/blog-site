import { BlogMetadata } from "@/types/blog";

export const metadata: BlogMetadata = {
  id: "stripe-angular-laravel-payments",
  title: "Stripe Payments with Angular and Laravel: Start to Finish",
  description:
    "Implement secure card payments using Stripe with Angular (latest) and Laravel (latest). Covers setup, Payment Intents, Elements, webhooks, and testing.",
  thumbnail: "/api/placeholder/800/400",
  author: "Nauman Sadiq",
  date: "2025-09-02",
  readTime: "12 min read",
  tags: ["Stripe", "Angular", "Laravel", "Payments", "Webhooks", "TypeScript"],
  category: "Payments",
};

export default function StripeAngularLaravelPayments() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-8 theme-surface rounded-xl shadow-lg">
      <header className="mb-8">
        <h1 className="text-4xl font-bold theme-text-primary mb-4">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 theme-text-secondary mb-6">
          <span>By {metadata.author}</span>
          <span>•</span>
          <span>{metadata.date}</span>
          <span>•</span>
          <span>{metadata.readTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 theme-accent-bg/20 theme-accent rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl theme-text-primary leading-relaxed mb-6">
          This guide shows a clean, production-ready flow to accept card
          payments with Stripe using Angular on the frontend and Laravel on the
          backend. We will use Payment Intents, Stripe Elements, secure
          server-side confirmations, and webhooks for reliability.
        </p>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 theme-text-secondary mb-6">
          <li>Stripe account (test mode is fine)</li>
          <li>Angular (latest) project with routing and HttpClient</li>
          <li>Laravel (latest) API project</li>
          <li>
            Two keys from Stripe: Publishable key (frontend) and Secret key
            (backend)
          </li>
        </ul>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          1) Laravel: Install and Configure Stripe
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">{`# composer.json already present
composer require stripe/stripe-php

# .env
STRIPE_SECRET=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# config/services.php
return [
    // ...
    'stripe' => [
        'secret' => env('STRIPE_SECRET'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],
];`}</pre>
        </div>
        <p className="theme-text-secondary leading-relaxed mb-4">
          Store your keys in .env. Never expose your secret to the client.
        </p>

        <h3 className="text-xl font-semibold theme-text-primary mt-6 mb-3">
          Routes
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">{`// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;

Route::post('/payments/create-intent', [PaymentController::class, 'createIntent']);
Route::post('/payments/webhook', [PaymentController::class, 'webhook']);`}</pre>
        </div>

        <h3 className="text-xl font-semibold theme-text-primary mt-6 mb-3">
          Controller
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">{`// app/Http/Controllers/PaymentController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function createIntent(Request $request): Response
    {
        // In production, calculate amount server-side based on product/price IDs
        $amount = (int) ($request->input('amount', 1999)); // in cents
        $currency = $request->input('currency', 'usd');

        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));

        $intent = $stripe->paymentIntents->create([
            'amount' => $amount,
            'currency' => $currency,
            'automatic_payment_methods' => ['enabled' => true],
            // You can attach metadata/customer here as needed
        ]);

        return response([ 'clientSecret' => $intent->client_secret ]);
    }

    public function webhook(Request $request): Response
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $endpointSecret
            );
        } catch (\UnexpectedValueException $e) {
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response('Invalid signature', 400);
        }

        switch ($event->type) {
            case 'payment_intent.succeeded':
                $intent = $event->data->object; // \Stripe\PaymentIntent
                Log::info('Payment succeeded', ['id' => $intent->id]);
                // Fulfill the order, mark DB records paid, email, etc.
                break;
            case 'payment_intent.payment_failed':
                $intent = $event->data->object;
                Log::warning('Payment failed', ['id' => $intent->id]);
                break;
        }

        return response('ok');
    }
}
`}</pre>
        </div>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          2) Angular: Install Stripe and Build the Checkout UI
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-blue-400 text-sm">{`# Angular project
npm install @stripe/stripe-js @types/stripe-v3

# environment.ts
export const environment = {
  production: false,
  stripePublishableKey: 'pk_test_xxx',
  apiBaseUrl: 'http://localhost:8000/api' // your Laravel API
};`}</pre>
        </div>

        <h3 className="text-xl font-semibold theme-text-primary mt-6 mb-3">
          Service to Create Payment Intents
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-blue-400 text-sm">{`// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createIntent(amountCents: number, currency = 'usd') {
    return this.http
      .post<{ clientSecret: string }>(
        environment.apiBaseUrl + '/payments/create-intent',
        { amount: amountCents, currency }
      )
      .pipe(map(res => res.clientSecret));
  }
}
`}</pre>
        </div>

        <h3 className="text-xl font-semibold theme-text-primary mt-6 mb-3">
          Checkout Component with Stripe Elements (Payment Element)
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-blue-400 text-sm">{`// src/app/components/checkout/checkout.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private stripe?: Stripe;
  elements?: StripeElements;
  clientSecret = '';
  loading = false;

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripePublishableKey);

    // Ask backend for a PaymentIntent
    this.loading = true;
    try {
      // example amount: $19.99
      this.clientSecret = await this.paymentService.createIntent(1999).toPromise();

      const options: StripeElementsOptions = {
        clientSecret: this.clientSecret,
        appearance: { theme: 'night' }
      };
      this.elements = this.stripe!.elements(options);

      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
    } finally {
      this.loading = false;
    }
  }

  constructor(private paymentService: PaymentService) {}

  async pay() {
    if (!this.stripe || !this.elements) return;
    this.loading = true;
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: window.location.origin + '/checkout/result',
      }
    });
    if (error) {
      alert(error.message);
    }
    this.loading = false;
  }

  ngOnDestroy() {
    // Elements cleans up automatically when component unmounts
  }
}
`}</pre>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-blue-400 text-sm">{`<!-- src/app/components/checkout/checkout.component.html -->
<div class="card">
  <h2>Checkout</h2>
  <div id="payment-element"></div>
  <button (click)="pay()" [disabled]="loading">
    {{ loading ? 'Processing...' : 'Pay' }}
  </button>
</div>
`}</pre>
        </div>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          3) Handle the Result and Webhooks
        </h2>
        <p className="theme-text-secondary leading-relaxed mb-4">
          After confirmPayment, Stripe redirects to return_url. You can read the
          status from the URL or load the PaymentIntent again on the server. For
          reliability, use webhooks: they tell your server when a payment
          actually succeeds or fails.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">{`// Verify the webhook in your Stripe dashboard
# Set endpoint to: POST /api/payments/webhook
# Use the signing secret (whsec_...) in STRIPE_WEBHOOK_SECRET
`}</pre>
        </div>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          4) Security and Best Practices
        </h2>
        <ul className="list-disc pl-6 theme-text-secondary mb-6">
          <li>Never trust client-provided amounts. Calculate on the server.</li>
          <li>Use Payment Intents + Stripe Elements for PCI compliance.</li>
          <li>Verify webhooks and update your database atomically.</li>
          <li>Use test cards like 4242 4242 4242 4242 in test mode.</li>
          <li>
            Store only Stripe IDs on your side; do not store raw card data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          Done: From Start to First Payment
        </h2>
        <p className="theme-text-secondary leading-relaxed mb-6">
          You now have a working, secure payment flow using Angular and Laravel
          with Stripe: backend creates PaymentIntents, frontend renders the
          Payment Element, and webhooks finalize the order. This pattern scales
          well to subscriptions, invoices, and on-session/off-session flows.
        </p>
      </div>
    </article>
  );
}

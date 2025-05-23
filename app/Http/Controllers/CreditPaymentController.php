<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CreditPayment;
use Illuminate\Http\Request;

class CreditPaymentController extends Controller
{
    public function store(Request $request)
    {

        $cp = CreditPayment::create([
            'cart_id' => $request->cart_id,
            'amount' => $request->amount,
            'payment_type' => $request->payment_type,
        ]);
        $cart =  Cart::where('cart_id', $cp->cart_id)->first();
        if ($cart) {
            $cart->update([
                'status' => ($cart->balance - $request->amount == 0) ? 'Paid' : 'Partial',
                'balance' => $cart->balance - $request->amount,
                'due_date' => $request->due_date,
            ]);
        }
        return response()->json('success', 200);
    }
}

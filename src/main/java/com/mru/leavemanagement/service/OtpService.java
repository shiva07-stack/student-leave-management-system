package com.mru.leavemanagement.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private final Map<String, String> otpStorage = new HashMap<>();

    public String generateOtp(String username) {

        String otp = String.format("%06d", new Random().nextInt(999999));

        otpStorage.put(username, otp);

        return otp;
    }

    public boolean verifyOtp(String username, String otp) {

        return otp.equals(otpStorage.get(username));
    }

    public void removeOtp(String username) {

        otpStorage.remove(username);
    }
}
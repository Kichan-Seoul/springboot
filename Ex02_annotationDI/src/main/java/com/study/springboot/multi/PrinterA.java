package com.study.springboot.multi;

import org.springframework.stereotype.Component;

// @Componet : nean으로 등록
@Component
public class PrinterA implements Printer {

	@Override
	public void print(String msg) {
		System.out.println("Printer A : " + msg);
	}

}

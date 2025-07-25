﻿using backend.Application.DTOs.Accounts;
using backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{

    [Route("api/admin/accounts")]
    [ApiController]
    //[Authorize(Roles = "Admin")]

    public class AdminAccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AdminAccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _accountService.GetAllAsync();
            return result.IsSuccess ? Ok(result.Data) : BadRequest(result.Error);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _accountService.GetByIdAsync(id);
            return result.IsSuccess ? Ok(result.Data) : NotFound(result.Error);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAccountRequest request)
        {
            var result = await _accountService.CreateAsync(request);
            return result.IsSuccess ? Ok(result.Data) : BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateAccountRequest request)
        {
            var result = await _accountService.UpdateAsync(id, request);
            return result.IsSuccess ? Ok(result.Data) : BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _accountService.DeleteAsync(id);
            return result.IsSuccess ? Ok(result.Data) : NotFound(result.Error);
        }
    }
}



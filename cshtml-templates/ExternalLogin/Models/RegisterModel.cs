using System.ComponentModel.DataAnnotations;

namespace FunSun.Auth.Pages.ExternalLogin.Models;

public class RegisterModel
{
    public string Email { get; set; }
    public string ConfirmEmail { get; set; }
    public string Phone { get; set; }
}